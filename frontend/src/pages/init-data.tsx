import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { InitDataType } from "@/types/init-data-schema";
import InitSchema from "@/types/init-data-schema";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { z } from "zod";
import { addBulkProducts } from "@/lookup";
import { Response } from "@/types/response-type";
import ErrorMessage from "@/types/error-message";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/confirm-dialog";
import { Loader2, Upload, FileJson, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InitData = () => {
    const [initData, setInitData] = useState<InitDataType | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isParsing, setIsParsing] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsParsing(true);
        setErrors([]);
        setInitData(null);
        setFileName("");

        const file = event.target.files?.[0];
        if (!file) {
            setIsParsing(false);
            return;
        }

        setFileName(file.name);

        if (file.type !== "application/json") {
            setErrors(["File must be of type JSON."]);
            setIsParsing(false);
            return;
        }

        file.text().then((value) => {
            try {
                const parsedJson = JSON.parse(value);
                const parsedInitData = InitSchema.parse(parsedJson);
                setInitData(parsedInitData);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setErrors(error.issues.map(issue => `${issue.path.join('.')} - ${issue.message}`));
                } else {
                    setErrors(["Failed to parse JSON file. Please check its format."]);
                }
            } finally {
                setIsParsing(false);
            }
        });
    };

    const handleSubmit = () => {
        if (!initData) return;

        setIsUploading(true);
        setErrors([]);

        addBulkProducts(initData).then((response: Response) => {
            if (response.status >= 400) {
                const errorMessages = response.body.error.message.map((error: ErrorMessage) => `${error.field}: ${error.message}`);
                setErrors(errorMessages);
            } else {
                navigate("/");
            }
        }).finally(() => {
            setIsUploading(false);
        });
    };

    const isSubmitDisabled = isParsing || isUploading || errors.length > 0 || !initData;

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Initialize Products</CardTitle>
                    <CardDescription>Upload a JSON file to bulk-add products to the database. This is a destructive action and may override existing data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="json-upload">Product JSON File</Label>
                        <Input id="json-upload" type="file" onChange={handleFileChange} accept="application/json" />
                    </div>

                    {isParsing && (
                        <div className="flex items-center text-muted-foreground">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Parsing file...
                        </div>
                    )}

                    {errors.length > 0 && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Validation Error</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc list-inside">
                                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {initData && errors.length === 0 && (
                        <Alert>
                            <FileJson className="h-4 w-4" />
                            <AlertTitle>File Ready</AlertTitle>
                            <AlertDescription>
                                Successfully parsed <span className="font-bold">{fileName}</span>. Found <span className="font-bold">{initData.Products.length}</span> products to upload.
                            </AlertDescription>
                        </Alert>
                    )}

                </CardContent>
                <CardFooter>
                    <ConfirmDialog
                        title="Confirm Product Initialization"
                        text={`Are you sure you want to initialize the database with products from ${fileName}? This can be a destructive action.`}
                        onConfirm={handleSubmit}
                    >
                        <Button className="w-full" disabled={isSubmitDisabled}>
                            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Upload and Initialize
                        </Button>
                    </ConfirmDialog>
                </CardFooter>
            </Card>
        </div>
    );
}

export default InitData;