import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from './Section';
import css from './App.module.css';
import initialcontacts from 'contacts.json';

class App extends Component {
  state = {
    contacts: initialcontacts,
    filter: '',
    // name: '',
  };

  addContact = ({ name, number }) => {
    // const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // formSubmitHandler = e => {
  //   console.log(e);
  // };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={this.getVisibleContact()} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
