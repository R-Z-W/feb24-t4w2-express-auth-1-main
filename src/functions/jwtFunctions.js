const jwt = require("jsonwebtoken");

let jwtSecretKey = process.env.JWT_SECRET_KEY;

function generateJWT(userId, username, roles = null) {
	return jwt.sign(
		{
			userId: userId,
			username: username,
			roles: roles
		},
		jwtSecretKey,
		{
			expiresIn: "7d"
		}
	);
}

function decodeJWT(tokenToDecode) {
	return jwt.verify(tokenToDecode, jwtSecretKey);
}

async function validateUserAuth(request, response, next) {
	const token = request.headers['authorization']?.split(' ')[1]; // Extract the token from header

	if (!token) {
		return response.status(403).json({
			message: "Sign in to view this content!"
		});
	}

	try {
		const decodedData = decodeJWT(token);
		
		if (decodedData.userId) {
			next();
		} else {
			return response.status(403).json({
				message: "Sign in to view this content!"
			});
		}
	} catch (err) {
		return response.status(403).json({
			message: "Invalid token."
		});
	}
}

module.exports = { generateJWT, decodeJWT, validateUserAuth };
