import jwt from "jsonwebtoken";


const verificarToken = (req, res, next) => {

    // validacion de token
    const token = req.signedCookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next()
    } catch (error) {
        return res.status(401).send('Token Invalido');
    }
}

export {
    verificarToken
}