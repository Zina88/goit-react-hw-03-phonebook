import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './App.module.css';
import initialcontacts from 'contacts.json';

class App extends Component {
  state = {
    contacts: initialcontacts,
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name === name)
      ? Report.warning(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, newContact],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

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
    const { filter } = this.state;

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={this.getVisibleContact()} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
