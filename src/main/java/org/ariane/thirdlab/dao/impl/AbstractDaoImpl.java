package org.ariane.thirdlab.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.ariane.thirdlab.dao.AbstractDao;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

public class AbstractDaoImpl<E extends Serializable> extends HibernateDaoSupport implements AbstractDao<E> {

	private Class<E> entityClass;

	protected AbstractDaoImpl(Class<E> entityClass) {
		this.entityClass = entityClass;
	}

	@Override
	public E findById(Serializable id) {
		return (E) getHibernateTemplate().get(entityClass, id);
	}

	@Override
	public List<E> findAll() {
		return getHibernateTemplate().loadAll(entityClass);
	}

	@Override
	public void save(E e) {
		getHibernateTemplate().save(e);
	}

	@Override
	public void delete(E e) {
		getHibernateTemplate().delete(e);
	}

	@Override
	public List<E> query(String hql, Object[] args) {
		List<E> list = (List<E>) getHibernateTemplate().find(hql, args);
		return list;
	}
}
