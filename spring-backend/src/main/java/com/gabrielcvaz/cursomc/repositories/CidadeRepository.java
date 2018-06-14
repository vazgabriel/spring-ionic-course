package com.gabrielcvaz.cursomc.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gabrielcvaz.cursomc.domain.Cidade;
import com.gabrielcvaz.cursomc.domain.Estado;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Integer> {

	List<Cidade> findByEstadoOrderByNome(Estado estado);
	
}
