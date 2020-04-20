import React,{useState} from 'react'
import Base from '../core/Base'

const Signup = ()=>{
    
    const signUpForm = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-light">Name</label>
                <input
                  className="form-control"
                //   onChange={handleChange("name")}
                  type="text"
                //   value={name}
                />
              </div>
              <div className="form-group">
                <label className="text-light">Email</label>
                <input
                  className="form-control"
                //   onChange={handleChange("email")}
                  type="email"
                //   value={email}
                />
              </div>

              <div className="form-group">
                <label className="text-light">Password</label>
                <input
                //   onChange={handleChange("password")}
                  className="form-control"
                  type="password"
                //   value={password}
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
    
    
    
    return(
        <Base title="Sign Up Page" description="A page for SignUp">
        {signUpForm()}
        </Base>
        
    )
}
export default Signup;