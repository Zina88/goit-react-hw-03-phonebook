import PropTypes from 'prop-types';
import IconButton from 'components/IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <p>{name}</p>
          <p>{number}</p>
          <IconButton>
            <DeleteIcon
              className={css.delIcon}
              width="20"
              height="20"
              onClick={() => {
                onDeleteContact(id);
              }}
            />
          </IconButton>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
