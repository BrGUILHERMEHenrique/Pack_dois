package com.dois.pack.api.repositorys;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.dois.pack.api.models.FuncionarioHorario;

@Repository
public interface FuncionarioHorarioRepository extends JpaRepository<FuncionarioHorario, Integer>{

}
