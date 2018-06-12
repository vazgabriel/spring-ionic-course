package aplicacao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import dominio.Pessoa;

public class Programa {

	public static void main(String[] args) {

		// Inicia os gerenciadores de banco de dados
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("exemplo-jpa");
		EntityManager em = emf.createEntityManager();
		
		/* CRIANDO USUÁRIO */
		// Começa uma transação
		em.getTransaction().begin();
		
		// Persiste a pessoa
		em.persist(new Pessoa(null, "Teste", "teste@teste.com"));
		
		// Commita a alteração
		em.getTransaction().commit();
		
		// Busca uma pessoa de ID N (no caso 1) no banco de dados
		Pessoa p = em.find(Pessoa.class, 1);
		
		// Exibe a pessoa buscada
		System.out.println(p);
		
		/* REMOVENDO USUÁRIO */
		// Começa uma transação
		em.getTransaction().begin();

		// Remove uma pessoa do banco de dados
		em.remove(p);

		// Commita a alteração
		em.getTransaction().commit();
		
		// Fecha os gerenciadores do banco de dados
		em.close();
		emf.close();
	}

}
