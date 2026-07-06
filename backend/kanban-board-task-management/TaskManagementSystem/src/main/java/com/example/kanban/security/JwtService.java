package com.example.kanban.security;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	// Secret key (in real project, keep in application.properties)
	private static final String SECRET_KEY = "my-very-secret-key-my-very-secret-key";

	private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

	// 1. Generate Token
	public String generateToken(UserDetails userDetails) {

		return Jwts.builder().setSubject(userDetails.getUsername()) // email
				.setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24
																													// hours
				.signWith(key, SignatureAlgorithm.HS256).compact();
	}

	// 2. Extract username (email)
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	// 3. Extract single claim
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	// 4. Extract all claims
	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
	}

	// 5. Validate token
	public boolean isTokenValid(String token, UserDetails userDetails) {

		final String username = extractUsername(token);

		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	// 6. Check expiration
	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

}
