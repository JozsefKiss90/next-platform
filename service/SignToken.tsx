import jwt from 'jsonwebtoken';

const SignToken = async (email)=> {
if (!process.env.NEXT_PUBLIC_JWT_SECRET_KEY) {
    throw new Error("JWT secret key is not defined");
    }
const token = await jwt.sign({id:email}, process.env.NEXT_PUBLIC_JWT_SECRET_KEY, {expiresIn: '1d'});
return token;
}

export default SignToken;