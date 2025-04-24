const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'Accès non autorisé' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Vérifier les rôles autorisés
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Permission refusée' });
            }

            next();
        } catch (err) {
            res.status(401).json({ message: 'Token invalide' });
        }
    };
};