package com.dois.pack.api.controllers;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {
		
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> constraintViolation(ConstraintViolationException exception){
		HttpHeaders headers = new HttpHeaders();
		headers.add("message", "Códigos de matricula repetidos, por favor varefique o mesmo");
		String msg = "Por favor verifique os campos, algum campo está vazio ou o código de matrícula está repetido";
		return ResponseEntity.badRequest().headers(headers).body(msg);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> tratarGenericException(Exception exception) {
		String msg = String.format("Erro inesperado no servidor, se possível verifique as informações passadas.");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.header("message", msg)
				.body(msg);
	}
	
	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<String> tratarNullPointerException(NullPointerException exception){
		String msg = "Algum parâmetro foi passado de forma errada, por favor verifique os dados passados";
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.header("message", msg)
				.body(msg);
	}

}
