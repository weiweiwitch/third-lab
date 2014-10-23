package org.ariane.thirdlab.dao;

import java.io.Serializable;
import java.util.List;

public interface AbstractDao<E extends Serializable> {

	public E findById(Serializable id);

	public List<E> findAll();

	public void save(E e);

	public void delete(E e);

	public List<E> query(String hql, Object[] args);

}
