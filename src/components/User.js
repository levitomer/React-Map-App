import React from 'react';

const User = ({user}) =>

			 <div id="user-0" className={`user col-sm-12 col-md-6 col-lg-4`}>
				<div className="details">
					<p className="location">
						<span>{user.name}</span>
						<br />
						<span>{user.location.latitude} - {user.location.longitude}</span>
					</p>
				</div>
			</div>


export default User;
