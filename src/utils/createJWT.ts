import { sign } from "jsonwebtoken";

const createJWT = (id: number): string => {
        const token = sign(
                { id }, process.env.JWT_TOKEN||""
        );
        return token;
}

export default createJWT;