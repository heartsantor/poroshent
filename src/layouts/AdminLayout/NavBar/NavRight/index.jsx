import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, ListGroup, Dropdown } from 'react-bootstrap';
import { ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { userLoggedOut } from '../../../../store/features/auth/authSlice';
import { setMenuData } from '../../../../store/features/menu/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import ChatList from './ChatList';
import { menuItemsEn, menuItemsBn } from '../../../../menu-items';
import avatar1 from '../../../../assets/images/user/avatar-1.jpg';

const NavRight = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [listOpen, setListOpen] = useState(false);

  const { i18n } = useTranslation();
  const [radioValue, setRadioValue] = useState(i18n.language);

  useEffect(() => {
    setRadioValue(i18n.language);
    if (i18n.language === 'en') {
      dispatch(
        setMenuData({
          menuData: menuItemsEn
        })
      );
    } else {
      dispatch(
        setMenuData({
          menuData: menuItemsBn
        })
      );
    }
  }, [i18n.language]);

  const handleLogOut = () => {
    dispatch(userLoggedOut());
  };

  const handleChange = (e) => {
    const lang = e.currentTarget.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    setRadioValue(lang);
  };
  const radios = [
    { name: 'বাংলা', value: 'bn' },
    { name: 'English', value: 'en' }
  ];

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              className="toggle-button"
              key={idx}
              id={`radios-${idx}`}
              type="radio"
              variant={radioValue === radio.value ? 'primary' : 'light'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={handleChange}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown>
            <Dropdown.Toggle as={Link} variant="link" to="#" className="displayChatbox" onClick={() => setListOpen(true)}>
              <i className="icon feather icon-mail" />
            </Dropdown.Toggle>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align={'end'} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head d-flex">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <div className="d-flex flex-column">
                  <span className="m-0">{user?.dealerName}</span>
                  <p className="m-0 text-light">{user?.dealerphone}</p>
                </div>

                <Button onClick={handleLogOut} className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Button>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-settings" /> Settings
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-mail" /> My Messages
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-lock" /> Lock Screen
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
