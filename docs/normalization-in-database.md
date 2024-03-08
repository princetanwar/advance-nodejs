## Normalization in DataBase

normalization is technique to remove or reduce redundancy from DB. makes query the required data easy.
normalization can be categorize in three form.

1. first form of normalization.
   there are 4 rules that need to be followed when applying first form of normalization

- each column should contain single value (not like 'js,java,c++' )
- each column should contain single type of values (date,int,varchar)
- each column name should be unique
- order in which data is store don't matter

2. second form of normalization.
   there are 2 rules that to be followed when applying second form of normalization

- table must be in the first form of normalization
- table should not have any partial dependency.

let's say we have a table that keeps track of library books and the people who borrow them:

| BookID | Title | Author | Borrower |
| ------ | ----- | ------ | -------- |
| 1      | JS    | prince | ram      |
| 2      | React | Vishal | deepak   |

Here, let's say (BookID, Title) is the primary key, meaning each combination of BookID and Title is unique.

Now, let's check for partial dependency. If we find an attribute that depends on only part of the primary key, we have a partial dependency.

In this case, Borrower depends on BookID alone, not on the entire primary key (BookID, Title). This is a partial dependency because the borrower's information is related to a specific book, not to the combination of BookID and Title.

To address partial dependency, we can create two tables:

Books Table

| BookID | Title | Author |
| ------ | ----- | ------ |
| 1      | JS    | prince |
| 2      | React | Vishal |

Borrower Table

| BookID | Borrower |
| ------ | -------- |
| 1      | ram      |
| 2      | deepak   |

3. third normalization

- table must be in the second form of normalization
- there should't be any transitive dependency.

#### Transitive Dependency:

A transitive dependency occurs when a non-prime attribute (an attribute not part of the primary key) is functionally dependent on another non-prime attribute, rather than on the primary key itself.
