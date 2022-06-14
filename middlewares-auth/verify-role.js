const checkRoles = (...availableRoles) => {
    return (req, res, next) => {
        let ROLE = req.body.role
        const ROLES = [...availableRoles]
        if(!ROLE) {
            return res.status(401).json({
                success: 0,
                message: "Access denied! Can't found the role detail."
            })
        }else{
            const result = ROLES.includes(ROLE)
            console.log(ROLES)
            if(!result){
                return res.status(401).json({
                    success: 0,
                    message: "Unauthorized role"
                })
            }else{
                next()
            }
        }

    }
}

module.exports = checkRoles