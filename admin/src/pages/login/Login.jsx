import { useState } from "react";
import { useDispatch } from "react-redux";
import styledcss from "styled-components";
// import { login } from "../../redux/apiCalls";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userRedux";
import { publicRequest } from "../../requestMethods";


const Container = styledcss.div`
  width: 100vw;
  height: 100vh;
  background: 
    url("https://images.unsplash.com/photo-1458442310124-dde6edb43d10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGlraW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styledcss.div`
  width: 25%;
  padding: 20px;

  box-shadow:0 8px 32px 0 rgb(134 134 134);
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

const Title = styledcss.h1`
  font-size: 24px;
  font-weight: 300;
`;


const Form = styledcss.form`
  display: flex;
  flex-direction: column;
`;

const Input = styledcss.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 0.5em;
`;

const Button = styledcss.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: white;
  cursor: pointer;
  border-radius: 0.5em;
  font-weight: bold;
`;

const Link = styledcss.a`
  margin: 5px 0px;
  text-decoration: underline;
  cursor: pointer;
  font-size: 12px;
  margin: 20px 0px;
  color:white;
`;
const Center = styledcss.div`
    flex:1;
    text-align: center;
    margin-bottom: 2em;
}
`;
const Logo = styledcss.h1`
    font-weight: bold;
`

const Alert = styledcss.span`
    color:red;
`

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  return (
    <Container>
      <Wrapper>
        <Center><Logo>Hikez.</Logo><span style={{ marginLeft: "5em", color: "cornflowerblue" }}>ADMIN</span></Center>
        <Title>SIGN IN</Title>
        <Form>
          <Input required placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Input required type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Button  onClick={handleLogin}> LOGIN</Button>
          {/* {error && <Alert>ERROR!!</Alert>} */}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
    //   <div
    //     style={{
    //       height: "100vh",
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <input
    //       style={{ padding: 10, marginBottom: 20 }}
    //       type="text"
    //       placeholder="username"
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <input
    //       style={{ padding: 10, marginBottom: 20 }}
    //       type="password"
    //       placeholder="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button onClick={handleClick} style={{ padding: 10, width:100 }}>
    //       Login
    //     </button>
    //   </div>
  );
};





// const Login = () => {
//   const dispatch = useDispatch()

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(false)
//   const [disable, setDisable] = useState(false)

//   const handleLogin = (e) => {
//     e.preventDefault();
//     login(dispatch, { username, password })
//   }
//   const login = async (dispatch, user) => {
//     dispatch(loginStart());

//     try {
//       setDisable(true)
//       const res = await publicRequest.post("/auth/login", user);
//       dispatch(loginSuccess(res.data.accessToken));
//       const token = res.data.accessToken
//       // console.log(res.data.accessToken)
//       localStorage.setItem('user', token);

//       console.log(res.data);
//       setError(false)
//     } catch (err) {
//       console.log(err)
//       setError(true)
//       dispatch(loginFailure());
//       setDisable(false)
//     }
//   };



//   return (
    
//   );
// };

export default Login;
