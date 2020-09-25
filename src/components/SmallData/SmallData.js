import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { ArrowDown, ArrowUp, ArrowDownUp } from 'react-bootstrap-icons';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import './SmallData.css'



class SmallData extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      count: 0,
      inf: props.inf,
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      isForm: false,
      isButton: true

    }
  }



  onClick = () => {
    this.setState({
      isForm: true,
      isButton: false
    });
  }



  onSubmit = (e) => {
    e.preventDefault()
    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      inf,
    } = this.state
    const newInf = inf
    newInf.unshift({ id, firstName, lastName, email, phone })
    this.setState({
      inf: newInf

    },

    )
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })

  }


  render() {
    const {
      inf
    } = this.state


    const columns = [{
      dataField: 'id',
      text: 'ID',
      filter: textFilter(),
      sort: true,
      sortCaret: (order) => {
        if (order === 'desc') {
          return (

            <ArrowDown className="sort-arrow" />
          )
        } else if (order === 'asc') {
          return (
            <ArrowUp className="sort-arrow" />
          )
        } else {
          return (
            <ArrowDownUp className="sort-arrow" />
          )
        }
      }

    }, {
      dataField: 'firstName',
      text: 'First Name',
      filter: textFilter()
    }, {
      dataField: 'lastName',
      text: 'Last Name',
      filter: textFilter()
    }, {
      dataField: 'email',
      text: 'email',
      filter: textFilter()
    }, {
      dataField: 'phone',
      text: 'phone',
      filter: textFilter()
    },
    ];


    const expandRow = {
      showExpandColumn: false,
      renderer: row => (
        <div>
          <h5><b>Выбран пользователь:</b> {row.firstName + ' ' + row.lastName}</h5>
          <li><b>Описание:</b> {row.description}</li>
          <li><b>Адрес проживания:</b> {row.address.streetAddress}</li>
          <li><b>Город:</b> {row.address.city}</li>
          <li><b>Провинция/штат:</b> {row.address.state}</li>
          <li><b>Индекс:</b> {row.address.zip}</li>
        </div>
      )
    };



    return (
      <div>

        {this.state.isForm ?
          <form>
            <div className="formSmallData">
              <div className="form-group"><input className="form-control" type="text" name="id" value={this.state.id} onChange={this.handleChange} placeholder="Ввведите ID" /></div>
              <div className="form-group"><input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="Ввведите имя" /></div>
              <div className="form-group"><input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Ввведите фамилию" /></div>
              <div className="form-group"><input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Ввведите электронную почту" /></div>
              <div className="form-group"><input className="form-control" type="text" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Ввведите номер телефона" /></div>
            </div>
            <div className="addToTheTable"><button className="btn btn-primary" onClick={this.onSubmit} type="submit">Добавить в таблицу</button></div>
          </form> : null}

        <div className="addDataClass">{this.state.isButton ? <button className="btn btn-primary" onClick={this.onClick}>Добавить данные</button> : null}</div>

        <BootstrapTable keyField='description' data={inf} columns={columns} filter={filterFactory()} expandRow={expandRow} />
      </div>
    );
  }
}

export default SmallData;
