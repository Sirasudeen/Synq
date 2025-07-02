import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign(
        { userId }, process.env.JWT_SECRET, { expiresIn: '2d' }
    )
    res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 2,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    return token;
}