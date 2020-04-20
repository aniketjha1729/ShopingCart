import React from 'react'
import Base from '../core/Base'

const Signin=() =>{
    
    const signInForm = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-light">Email</label>
                <input
                //   onChange={handleChange("email")}
                //   value={email}
                  className="form-control"
                  type="email"
                />
              </div>

              <div className="form-group">
                <label className="text-light">Password</label>
                <input
                //   onChange={handleChange("password")}
                //   value={password}
                  className="form-control"
                  type="password"
                />
              </div>
              <button  className="btn btn-success btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    };
    
    
    return (
        <Base title="Sign In" description="A Page for SignIn!">
            {signInForm()}
        </Base>
    )
}
export default Signin;