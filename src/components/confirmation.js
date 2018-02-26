import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Confirmation extends Component {
  constructor() {
    super()
    this.state = {}
  }

componentWillMount(){
  this.setState({orderSummary: this.props.location.state.orderSummary})
}

  dashboard = () => {
    this.props.history.push('/dashboard')
  }

  newOrder = () => {
    this.props.history.push('/orderForm', { merchantId: this.props.location.state.merchantId })
  }

  render() {
    return (
      <div className='inital-css'>
        <div className='app-nav'>
          <h3>Confirmation</h3>
        </div>

        <div className='confirmation-wrapper'>

          <div className='confirmation-header'>
            <div className='order-status'>
              <div>Status: In Progress</div>
              <div>PAID</div>
            </div>

            <div id='order-num'>10273</div>
          </div>

          <div className='merchant-adress-info'>
            <div className='store-name'>Dry Cleaner and Tailor St-Viateur</div>
            <div>150 rue Saint Viateur Montreal, QC, H2T 2L3</div>
            <div>Phone: 514-276-3106</div>
          </div>

          <div>
            <div className='client-info-fields'>
              <div className='client-phone'>
                <div className='confirmation-field-title'>Phone</div>
                <div className='client-info'>514-261-5816</div>
              </div>

              <div className='date'>
                <div className='confirmation-field-title'>Date</div>
                <div className='client-info'>02/25/2018</div>
              </div>
            </div>
            <div className='line'></div>
          </div>

          <div>
            <div className='client-info-fields'>
              <div className='confirmation-field-title'>Name</div>
              <div className='client-info'>Wesley Yendrys</div>
            </div>
            <div className='line'></div>
          </div>

          <div>
            <div className='client-info-fields'>
              <div className='confirmation-field-title'>Address</div>
              <div className='client-info'>950 Notre-Dame, Montreal QC H3C0K3</div>
            </div>
            <div className='line'></div>
          </div>


          <div className='ready-date-wrapper'>
            <div className='ready-date'>Mon</div>
            <div className='ready-date'>Feb</div>
            <div className='ready-date'>28</div>
            <div className='ready-date'>2018</div>
            <div className='ready-date'>12 PM</div>
          </div>


          <div className='item-list-wrapper'>
            <div className='item-list'>
              <div id='form-header' className='item-type'>Article</div>
              <div id='form-header' className='item-amount'>QTY</div>
              <div id='form-header' className='item-amount'>AMOUNT</div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Trousers</div>
              <div className='item-amount'>{this.state.orderSummary.trousers}</div>
              <div className='item-amount'>$12.50</div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Suit</div>
              <div className='item-amount'>{this.state.orderSummary.suit}</div>
              <div className='item-amount'></div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Overcoat</div>
              <div className='item-amount'>{this.state.orderSummary.overcoat}</div>
              <div className='item-amount'>$35.99</div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Ladies Suit</div>
              <div className='item-amount'>{this.state.orderSummary.ladiesSuit}</div>
              <div className='item-amount'></div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Dress</div>
              <div className='item-amount'>{this.state.orderSummary.dress}</div>
              <div className='item-amount'></div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Skirt</div>
              <div className='item-amount'>{this.state.orderSummary.skirt}</div>
              <div className='item-amount'></div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Jacket</div>
              <div className='item-amount'>{this.state.orderSummary.jacket}</div>
              <div className='item-amount'>$20.00</div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Blouse</div>
              <div className='item-amount'>{this.state.orderSummary.blouse}</div>
              <div className='item-amount'></div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Shirt</div>
              <div className='item-amount'>{this.state.orderSummary.shirt}</div>
              <div className='item-amount'></div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Tie</div>
              <div className='item-amount'>{this.state.orderSummary.tie}</div>
              <div className='item-amount'></div>
            </div>

            <div className='item-list'>
              <div id='last-item' className='item-type'></div>
              <div id='last-item' className='item-amount'>TOTAL</div>
              <div id='last-item' className='item-amount'>${this.state.orderSummary.totalPrice}</div>
            </div>
          </div>

          <p>Service: Regular</p>

        </div>
        <div>
          <button onClick={this.dashboard}>Dashboard</button>
          {/* <button onClick={this.newOrder}>New Order</button> */}
        </div>
      </div>
    )
  }
}

export default Confirmation
