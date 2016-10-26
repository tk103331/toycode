package com.dreamlacus.util;

public class Bean<T> {
    private T target;

    public Bean(T target) throws Exception {
        if (target == null) {
            throw new Exception("target can not be null!");
        }
        this.target = target;
    }

    public <P> P get(String expression) {
        return BeanUtil.getValue(target, expression);
    }

    public <P> void set(String expression, P value) {
        BeanUtil.setValue(target, expression, value);
    }
}
