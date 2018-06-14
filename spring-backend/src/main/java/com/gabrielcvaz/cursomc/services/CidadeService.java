package com.gabrielcvaz.cursomc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gabrielcvaz.cursomc.domain.Cidade;
import com.gabrielcvaz.cursomc.domain.Estado;
import com.gabrielcvaz.cursomc.repositories.CidadeRepository;

@Service
public class CidadeService {
	
	@Autowired
	private CidadeRepository repo;
	
	public List<Cidade> findByEstado(Estado estado) {
		return repo.findByEstadoOrderByNome(estado);
	}
	
}
