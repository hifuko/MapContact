# MapContact

This is a single-page application (SPA) that enables users to record people's addresses and show them on a map. 


![Screenshot from 2022-05-22 19-43-23](https://user-images.githubusercontent.com/45092816/169708597-25b51a99-6641-4224-a802-ad3c46027563.png)


## Technology stack

### Frontend
react@16.13.1 + react-router@5.2.0 + axios@0.19.2 + semantic-ui-react@2.1.2 + leaflet@1.6.0

### Backend
node@14.18.0 + express@4.17.1 + mongoDB + mongoose@5.9.22 + jsonwebtoken@8.5.1

## Run the project

### Frontend

Enter **adviz-react**, run 

`npm install`

`npm start`

Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

### Backend

Enter **adviz-backend**, run 

`npm install`

`npm start`

## Login

Go to http://localhost:3000/adviz/login

Admin user: 

username: admin, password: 123

Normalo user:

username: normalo, password: 123  

![Screenshot from 2022-05-22 19-44-18](https://user-images.githubusercontent.com/45092816/169708637-fc79179a-6b18-45df-9aae-83fc7f7aa23b.png)



## Features

- There are two types of users: admin and normalo.
- Admin users can see all contacts/addresses including the private ones, as well as add, update and delete contacts/addresses. The addresses will be marked in the map.

![Screenshot from 2022-05-22 19-43-23](https://user-images.githubusercontent.com/45092816/169709091-88eb0799-1d66-460e-99e8-170cd6e7ee32.png)
![Screenshot from 2022-05-22 19-43-56](https://user-images.githubusercontent.com/45092816/169709098-067f62e3-02f9-4865-9d79-1d06048ad6ad.png)

- Normalo users cannot see private contacts/addresses. They can only read contact details without being able to add, update or delete contacts/addresses.

![Screenshot from 2022-05-22 19-44-34](https://user-images.githubusercontent.com/45092816/169709108-2e6ce841-d11d-4bb1-93a1-13274604edbc.png)
![Screenshot from 2022-05-22 19-44-46](https://user-images.githubusercontent.com/45092816/169709115-3905886c-73e0-4053-a2e7-eebaabe85e9b.png)





