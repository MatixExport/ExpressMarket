import json

import httpx
import functools
from mcp.server.fastmcp import FastMCP, Context
from fastapi import Header
from typing import Annotated, List, Dict, Any, Optional

# --- Configuration ---
BASE_URL = "http://localhost:3000"

# Create an MCP server
mcp = FastMCP("ExpressMarket API", json_response=True)


# --- Code Deduplication Helpers ---

def handle_request_errors(func):
    """Decorator to handle common httpx request errors."""

    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except httpx.HTTPStatusError as e:
            return {"error": "HTTP Status Error", "status_code": e.response.status_code, "details": e.response.text}
        except httpx.RequestError as e:
            return {"error": "Request Error", "details": str(e)}

    return wrapper


async def make_request(method: str, url: str, **kwargs) -> dict:
    """Helper function to make an asynchronous HTTP request."""
    async with httpx.AsyncClient() as client:
        response = await client.request(method, url, **kwargs)
        response.raise_for_status()
        # Handle cases with no content in response
        return response.json() if response.status_code != 204 else {"status": "success", "code": 204}


async def get_auth_headers(ctx: Context) -> Dict[str, str]:
    """Helper to get authorization headers from context."""
    headers = {}
    auth_token = ctx.request_context.request.headers.get("ACCESS")
    if auth_token:
        headers["Authorization"] = f"Bearer {auth_token}"
    return headers


@mcp.resource("users://whoami")
@handle_request_errors
async def get_current_user(ctx: Context) -> dict:
    """Get current user details."""
    headers = await get_auth_headers(ctx)
    return await make_request("GET", f"{BASE_URL}/users/whoami", headers=headers)


@mcp.tool()
@handle_request_errors
async def update_user(userId: int, ctx: Context, login: Optional[str] = None, password: Optional[str] = None,
                      email: Optional[str] = None, phone: Optional[str] = None, role: Optional[str] = None) -> dict:
    """Update a user's details."""
    headers = await get_auth_headers(ctx)
    payload = {k: v for k, v in locals().items() if
               k in ['login', 'password', 'email', 'phone', 'role'] and v is not None}
    return await make_request("PUT", f"{BASE_URL}/users/{userId}", json=payload, headers=headers)


# --- Products ---

@mcp.resource("products://list")
async def get_all_products(uri: str) -> str:
    """Get all products."""
    response = await make_request("GET", f"{BASE_URL}/products")
    return json.dumps(response, indent=2)


@mcp.tool()
@handle_request_errors
async def create_product(name: str, description: str, price: float, weight: float, CategoryId: int,
                         ctx: Context) -> dict:
    """Create a new product (employee only)."""
    headers = await get_auth_headers(ctx)
    json_data = {"name": name, "description": description, "price": price, "weight": weight, "CategoryId": CategoryId}
    return await make_request("POST", f"{BASE_URL}/products", headers=headers, json=json_data)


@mcp.resource("products://{productId}")
@handle_request_errors
async def get_product_by_id(productId: int) -> dict:
    """Get a product by ID."""
    return await make_request("GET", f"{BASE_URL}/products/{productId}")


@mcp.tool()
@handle_request_errors
async def update_product(productId: int, name: str, description: str, price: float, weight: float, CategoryId: int,
                         ctx: Context) -> dict:
    """Update a product by ID (employee only)."""
    headers = await get_auth_headers(ctx)
    json_data = {"name": name, "description": description, "price": price, "weight": weight, "CategoryId": CategoryId}
    return await make_request("PUT", f"{BASE_URL}/products/{productId}", headers=headers, json=json_data)


@mcp.resource("products://{productId}/seo-description")
@handle_request_errors
async def get_product_seo_description(productId: int) -> dict:
    """Get SEO description for a product."""
    return await make_request("GET", f"{BASE_URL}/products/{productId}/seo-description")


# --- Orders ---

@mcp.resource("orders://")
@handle_request_errors
async def get_all_orders(ctx: Context) -> dict:
    """
    Get all orders (employee only).
    """
    headers = await get_auth_headers(ctx)
    return await make_request("GET", f"{BASE_URL}/orders", headers=headers)


@mcp.tool()
@handle_request_errors
async def create_order(products: list[dict], ctx: Context) -> dict:
    """
    Create a new order with one or more products.

    Args:
        products: List of products to order. Each item must have:
            - product_id (int): The ID of the product to order
            - quantity (int): Number of units to order

    Example:
        products = [
            {"product_id": 123, "quantity": 2},
            {"product_id": 456, "quantity": 1}
        ]
    """
    headers = await get_auth_headers(ctx)

    products_list = [
        {"ProductId": int(item["product_id"]), "quantity": int(item["quantity"])}
        for item in products
    ]

    return await make_request(
        "POST",
        f"{BASE_URL}/orders",
        json={"Products": products_list},
        headers=headers
    )


@mcp.resource("orders://user")
@handle_request_errors
async def get_user_orders(ctx: Context) -> dict:
    """Get orders for the current user."""
    headers = await get_auth_headers(ctx)
    return await make_request("GET", f"{BASE_URL}/orders/user", headers=headers)


@mcp.tool()
@handle_request_errors
async def add_order_review(orderId: int, rating: int, ctx: Context, review: Optional[str] = None) -> dict:
    """Add a review to an order."""
    headers = await get_auth_headers(ctx)
    return await make_request("POST", f"{BASE_URL}/orders/{orderId}/review", json={"rating": rating, "review": review},
                              headers=headers)


@mcp.tool()
@handle_request_errors
async def confirm_order(orderId: int, ctx: Context) -> dict:
    """Confirm a received order."""
    headers = await get_auth_headers(ctx)
    return await make_request("POST", f"{BASE_URL}/orders/{orderId}/confirm", headers=headers)


@mcp.tool()
@handle_request_errors
async def cancel_order(orderId: int, ctx: Context) -> dict:
    """Cancel an order."""
    headers = await get_auth_headers(ctx)
    return await make_request("POST", f"{BASE_URL}/orders/{orderId}/cancel", headers=headers)


@mcp.resource("orders://status/{statusId}")
@handle_request_errors
async def get_orders_by_status(statusId: int, ctx: Context) -> dict:
    """Get orders by status (employee only)."""
    headers = await get_auth_headers(ctx)
    return await make_request("GET", f"{BASE_URL}/orders/status/{statusId}", headers=headers)


@mcp.resource("orders://login/{login}")
@handle_request_errors
async def get_orders_by_user_login(login: str, ctx: Context) -> dict:
    """Get orders by user login (employee only)."""
    headers = await get_auth_headers(ctx)
    return await make_request("GET", f"{BASE_URL}/orders/login/{login}", headers=headers)


@mcp.resource("orders://{orderId}")
@handle_request_errors
async def get_order_by_id(orderId: int, ctx: Context) -> dict:
    """Get an order by ID."""
    headers = await get_auth_headers(ctx)
    return await make_request("GET", f"{BASE_URL}/orders/{orderId}", headers=headers)


@mcp.tool()
@handle_request_errors
async def update_order(orderId: int, ctx: Context, OrderStatusId: Optional[int] = None,
                       confirmDate: Optional[str] = None) -> dict:
    """Update an order's status (employee only)."""
    headers = await get_auth_headers(ctx)
    payload = {k: v for k, v in locals().items() if k in ['OrderStatusId', 'confirmDate'] and v is not None}
    return await make_request("PUT", f"{BASE_URL}/orders/{orderId}", json=payload, headers=headers)


# --- Status & Categories ---
@mcp.resource("status://")
@handle_request_errors
async def get_all_statuses() -> dict:
    """Get all possible order statuses."""
    return await make_request("GET", f"{BASE_URL}/status")


@mcp.resource("categories://")
@handle_request_errors
async def get_all_categories() -> dict:
    """Get all product categories."""
    return await make_request("GET", f"{BASE_URL}/categories")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(mcp.streamable_http_app(), host="0.0.0.0", port=8000)
