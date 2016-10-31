package com.dreamlacus.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {

    public static void main(String[] args) throws Exception {
        Person person = new Person();

        BeanUtil.setValue(person, "name", "Me");

        BeanUtil.setValue(person, "mother", new Person("Mother"));
        BeanUtil.setValue(person, "father", new Person("Father"));

        Map<String, Person> children = new HashMap<String, Person>();
        BeanUtil.setValue(person, "children", children);
        BeanUtil.setValue(person, "children['FirstChild']", new Person("FirstChild"));
        BeanUtil.setValue(person, "children['SecondChild']", new Person("SecondChild"));
        BeanUtil.setValue(person, "children['FirstChild']", new Person("FirstChild modified"));

        List<Person> friends = new ArrayList<Person>();
        BeanUtil.setValue(person, "friends", friends);
        BeanUtil.setValue(person, "friends[+]", new Person("Friend AAA"));
        BeanUtil.setValue(person, "friends[+]", new Person("Friend BBB"));
        BeanUtil.setValue(person, "friends[0]", new Person("Friend CCC"));

        System.out.println(person);
    }

    private static class Person {

        private String name;
        private Person mother;
        private Person father;
        private Map<String, Person> children;
        private List<Person> friends;

        public Person() {

        }

        public Person(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Person getMother() {
            return mother;
        }

        public void setMother(Person mother) {
            this.mother = mother;
        }

        public Person getFather() {
            return father;
        }

        public void setFather(Person father) {
            this.father = father;
        }

        public Map<String, Person> getChildren() {
            return children;
        }

        public void setChildren(Map<String, Person> children) {
            this.children = children;
        }

        public List<Person> getFriends() {
            return friends;
        }

        public void setFriends(List<Person> friends) {
            this.friends = friends;
        }

        @Override
        public String toString() {
            return new StringBuilder().append("{name:").append(name).append(",father:").append(father)
                    .append(",mother:").append(mother).append(",children:").append(children).append(",friends:")
                    .append(friends).append("}").toString();
        }
    }
}
