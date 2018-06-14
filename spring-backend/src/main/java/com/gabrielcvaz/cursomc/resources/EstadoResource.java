package com.gabrielcvaz.cursomc.resources;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gabrielcvaz.cursomc.domain.Cidade;
import com.gabrielcvaz.cursomc.domain.Estado;
import com.gabrielcvaz.cursomc.dto.CidadeDTO;
import com.gabrielcvaz.cursomc.dto.EstadoDTO;
import com.gabrielcvaz.cursomc.services.CidadeService;
import com.gabrielcvaz.cursomc.services.EstadoService;

@RestController
@RequestMapping(value = "/estados")
public class EstadoResource {

	@Autowired
	private EstadoService service;

	@Autowired
	private CidadeService cidadeService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<EstadoDTO>> findAllByName() {
		List<Estado> list = service.findByName();
		List<EstadoDTO> listDto = list.stream().map(obj -> new EstadoDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}

	@RequestMapping(value = "/{id}/cidades", method = RequestMethod.GET)
	public ResponseEntity<List<CidadeDTO>> find(@PathVariable Integer id) {
		List<Cidade> list = cidadeService.findByEstado(service.find(id));
		List<CidadeDTO> listDto = list.stream().map(obj -> new CidadeDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDto);
	}

}
