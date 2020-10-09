package com.dois.pack.api.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dois.pack.api.models.Funcionario;
import com.dois.pack.api.services.FuncionarioService;

@RestController
@RequestMapping({ "/funcionario" })
public class FuncionarioController {

	@Autowired
	FuncionarioService funcionarioService;

	@GetMapping
	public ResponseEntity<?> listar() {
		return ResponseEntity.ok(funcionarioService.getAll());
	}

//	@GetMapping("/{numero}")
//	public ResponseEntity<?> pegaPorNumero(@PathVariable Integer numero) {
//		return ResponseEntity.ok(funcionarioService.recuperarPorNumero(numero));
//	}

	@PostMapping
	public ResponseEntity<?> createFuncionario(@RequestBody Funcionario funcionario) {
		return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.create(funcionario));
	}

	@PutMapping("/{numero}")
	public ResponseEntity<?> updateFuncionario(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
		Funcionario funcionarioAtualizado = funcionarioService.update(id, funcionario);
		return ResponseEntity.ok(funcionarioAtualizado);
	}

//	@DeleteMapping("/{numero}")
//	public ResponseEntity<?> apagarConta(@PathVariable Integer numero) {
//		funcionarioService.apagarConta(numero);
//		return ResponseEntity.ok("Conta apagada com sucesso!!");
//	}
//
//	@PostMapping("/{numero}/{operacao}/{valor}")
//	public ResponseEntity<?> operacao(@PathVariable("numero") Integer numero, @PathVariable("operacao") String operacao,
//			@PathVariable("valor") Double valor) {
//		return ResponseEntity.status(HttpStatus.ACCEPTED).body(funcionarioService.operacao(operacao, valor, numero));
//	}
}
