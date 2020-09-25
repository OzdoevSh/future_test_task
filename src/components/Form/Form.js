import React from 'react';
import './Form.css'

class Form extends React.Component {
    render() {
        return (
            <div className="formm">
        
                {!this.props.isSmallData?<form onSubmit={this.props.smallDataMethod}>
                    <button type="submit" className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 margin-left">Получить маленькие данные</button>
                </form>:null}
                
                
                {!this.props.isBigData?
                <form onSubmit={this.props.bigDataMethod}>
                    <button type="submit" className="btn btn-primary btn-color btn-bg-color btn-sm col-xs-2 margin-left">Получить большие данные</button>
                </form>:null}
            </div>
        );
    }
         
     

}

export default Form;