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

	@GetMapping("/{id}")
	public ResponseEntity<?> pegaPorNumero(@PathVariable Integer id) {
		return ResponseEntity.ok(funcionarioService.getbyId(id));
	}

	@PostMapping
	public ResponseEntity<?> createFuncionario(@RequestBody Funcionario funcionario) {
		return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.create(funcionario));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateFuncionario(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
		Funcionario funcionarioAtualizado = funcionarioService.update(id, funcionario);
		return ResponseEntity.ok(funcionarioAtualizado);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> apagarConta(@PathVariable Integer id) {
		boolean response = funcionarioService.delete(id);
		if(response) {		
			return ResponseEntity.ok("Funcionario apagada com sucesso!!");
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
