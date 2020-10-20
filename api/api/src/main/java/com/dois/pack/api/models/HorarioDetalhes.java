package com.dois.pack.api.models;

import java.io.Serializable;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
public class HorarioDetalhes implements Serializable {
	
	private static final long serialVersionUID = 2103677445935061431L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@NotNull
	@OneToOne
	private Horario idHorario;
	
	@NotNull
	@Column(name = "folga")
	private Boolean folga;
	
	@NotNull
	@Column(name = "codigoDia", length = 15)
	private String codigoDia;
	
	@NotNull
	@Column(name = "entrada_1")
	private LocalTime entrada1;
	
	@NotNull
	@Column(name = "entrada_2")
	private LocalTime entrada2;
	
	@NotNull
	@Column(name = "saida_1")
	private LocalTime saida1;
	
	@NotNull
	@Column(name = "saida_2")
	private LocalTime saida2;

	public Horario getIdHorario() {
		return idHorario;
	}

	public void setIdHorario(Horario idHorario) {
		this.idHorario = idHorario;
	}

	public Boolean getFolga() {
		return folga;
	}

	public void setFolga(Boolean folga) {
		this.folga = folga;
	}

	public String getCodigoDia() {
		return codigoDia;
	}

	public void setCodigoDia(String codigoDia) {
		this.codigoDia = codigoDia;
	}

	public LocalTime getEntrada1() {
		return entrada1;
	}

	public void setEntrada1(LocalTime entrada1) {
		this.entrada1 = entrada1;
	}

	public LocalTime getEntrada2() {
		return entrada2;
	}

	public void setEntrada2(LocalTime entrada2) {
		this.entrada2 = entrada2;
	}

	public LocalTime getSaida1() {
		return saida1;
	}

	public void setSaida1(LocalTime saida1) {
		this.saida1 = saida1;
	}

	public LocalTime getSaida2() {
		return saida2;
	}

	public void setSaida2(LocalTime saida2) {
		this.saida2 = saida2;
	}

	public Integer getId() {
		return id;
	}
	
	
}
