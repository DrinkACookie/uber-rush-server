import { sign } from "jsonwebtoken";

const createJWT = (id: number): string => {
        const token = sign(
                { id }, process.env.JWT_TOKEN||""// option : https://www.npmjs.com/package/jsonwebtoken 
                ,{expiresIn:"2 days"}
                );
        return token;
}

export default createJWT;