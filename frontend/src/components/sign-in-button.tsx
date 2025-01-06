import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const SignInButton: React.FC = (
    ) => {
    return (
    <Link to="/auth/login" className='block mx-auto'>
        <Button variant="ghost">
            Have an account? Sign in!
        </Button>
    </Link>
    );
};

export default SignInButton;