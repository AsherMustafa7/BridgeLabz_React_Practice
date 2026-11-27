function Login({ onLogin }) {

    return (
        <div>
            <h2>Login Page</h2>

            <p>Please log in to access Student Management.</p>

            <button onClick={onLogin}>
                Login
            </button>
        </div>
    );

}

export default Login;