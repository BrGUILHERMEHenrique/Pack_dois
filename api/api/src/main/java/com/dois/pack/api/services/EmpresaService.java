package com.dois.pack.api.services;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dois.pack.api.models.Empresa;
import com.dois.pack.api.repositorys.EmpresaRepository;

@Service
public class EmpresaService {
	
	@Autowired
	EmpresaRepository empresaRepository;
	
	@Transactional
	public Empresa create(Empresa empresa) {
		return empresaRepository.save(empresa);
	}
	
	@Transactional
	public List<Empresa> getAll() {
		return empresaRepository.findAll();
	}
	
	@Transactional
	public Optional<Empresa> getbyId(Integer id) {
		return empresaRepository.findById(id);
	}
	
	@Transactional
	public boolean delete(Integer id) {
		Optional<Empresa> empresa = empresaRepository.findById(id);
		if(empresa.isPresent()) {
			empresaRepository.delete(empresa.get());
			return true;
		}else {
			return false;
		}
	}
	
	@Transactional
	public Empresa update(Integer id, Empresa empresa) {
		Optional<Empresa> empresaAntiga = empresaRepository.findById(id);
		Empresa empresaAtualizada = empresaAntiga.get();
		
		if(!empresa.getRazaoSocial().equals("") && empresa.getRazaoSocial() != null) {
			empresaAtualizada.setRazaoSocial(empresa.getRazaoSocial());
		}
		
		if(!empresa.getCodEmpresa().equals("") && empresa.getCodEmpresa() != null) {
			empresaAtualizada.setCodEmpresa(empresa.getCodEmpresa());
		}
		
		if(!empresa.getCnpj().equals("") && empresa.getCnpj() != null) {
			empresaAtualizada.setCnpj(empresa.getCnpj());
		}
		
		return empresaRepository.save(empresaAtualizada);
	}
}
