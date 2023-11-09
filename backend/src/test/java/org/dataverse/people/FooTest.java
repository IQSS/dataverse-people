package org.dataverse.people;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class FooTest {

    @Test
    public void testConstructor() {
        Foo foo = new Foo();
    }

    @Test
    public void testAdd() {
        assertEquals(0, Foo.add(0, 0));
        assertEquals(4, Foo.add(2, 2));
    }
}
