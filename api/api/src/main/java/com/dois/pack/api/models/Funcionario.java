package com.dois.pack.api.models;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "funcionario")
public class Funcionario implements Serializable {

	private static final long serialVersionUID = 2103677445935061431L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "codMatricula", unique = true)
	@Size(min = 10, max = 20)
	private String codMatricula;

	@Column(name = "nome")
	@Size(min = 1, max = 100)
	private String nome;

	@Column(name = "dataNascimento")
	@NotNull
	private LocalDate dataNascimento;

	@Column(name = "cpf", unique = true)
	@Size(min = 11, max = 11)
	private String cpf;

	@Column(name = "telefone")
	@Size(min = 8, max = 15)
	private String telefone;

	public Integer getId() {
		return id;
	}

	public String getCodMatricula() {
		return codMatricula;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getCpf() {
		return cpf;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public Funcionario() {
		super();

	}

	public Funcionario(Integer id, String codMatricula, String nome, LocalDate dataNascimento, String cpf,
			String telefone) {
		super();
		this.id = id;
		this.codMatricula = codMatricula;
		this.nome = nome;
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.telefone = telefone;
	}

}
