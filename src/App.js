import './App.css';
import { Fragment, useState } from 'react';
import Button from './componenents/Button';
import axios from 'axios';
const App = () => {
	const [userData, setUserData] = useState([]);
	const [loading, setloading] = useState(false);
	const [activeUser, setActiveUser] = useState(false);
	const [activeLink, setActiveLink] = useState(0);

	const onClickHandler = () => {
    setActiveLink(0)
		setloading(true);
		axios
			.get(`https://randomuser.me/api/`)
			.then((res) => {
				console.log(res.data.results);
				setUserData(res.data.results);
			})
			.catch((error) => {
				console.log(error);
				setloading(true);
			})
			.finally(() => {
				setloading(false);
				setActiveUser(true);
			});
	};

	const icons = [
		'fas fa-user fa-4x',
		'fas fa-envelope fa-4x',
		'fas fa-calendar-alt fa-4x',
		'fas fa-map-marker fa-4x',
		'fas fa-phone fa-4x',
		'fas fa-lock fa-4x',
	];
	const PhraseGenerator = ({ user }) => {
		const Phrases = [
			`Hi my name is ${user.name.first} ${user.name.last}`,
			`Hi email is ${user.email}`,
			`i was born on  ${user.dob.date.slice(0, 10)}`,
			`My country is ${user.location.country}`,
			`My phone number is ${user.phone}`,
			`My password is ${user.login.password}`,
		];
		return <h1>{Phrases[activeLink]}</h1>;
	};

	const activeLinkHandler = (index) => {
		setActiveLink(index);
	};

	const style = {
		color: 'green',
	};
	return (
		<div className='App'>
			<h1>Random user generater app</h1>
			<Button isActive={activeUser} clicked={onClickHandler} />
			{loading ? (
				<h1>Loding...</h1>
			) : (
				<div className='app__user'>
					{userData.map((user, index) => {
						return (
							<Fragment key={user.cell}>
								<img src={user.picture.large} alt='#' />
								<PhraseGenerator user={user} />
								<div className='app__icon'>
									{icons.map((icon, index) => {
										return (
											<i
												className={icon}
												key={index}
												onMouseEnter={() => activeLinkHandler(index)}
                        style={activeLink===index ? style : null}
                      ></i>
										);
									})}
								</div>
							</Fragment>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default App;
