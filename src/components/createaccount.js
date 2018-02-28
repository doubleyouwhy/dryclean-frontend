import React, { Component } from 'react'
import { registerMerchant } from '../requests.js'
import { Redirect } from 'react-router'

class CreateAccount extends Component {
    constructor() {
        super()
        this.state = {
            accountSetupForm: 'PERSONAL_INFO',
            merchantSubmittedInformation: {
                merchantFullName: '',
                merchantPersonalNumber: '',
                businessName: '',
                businessPhoneNum: '',
                businessAddress: '',
                city: '',
                province: '',
                postalCode: ''
            },
        }
    }

    // STEP 1/3  MERCHANT PERSONAL INFO  ---------------------
    submitPersonalInfoForm = (e) => {
        e.preventDefault()
        this.setState({
            accountSetupForm: 'BUSINESS_INFO',
            merchantSubmittedInformation: {
                merchantId: this.props.location.state.merchantId.merchantId,
                merchantFullName: this.merchantFullName.value,
                merchantPersonalNumber: this.merchantPersonalNumber.value
            }
        })
    }

    personalInfoForm = () => {
        return (
            <div className='inital-css'>
                <div className='app-nav'>
                    <h3>Account Setup</h3>
                </div>
                <div>
                    <div className='loginWrapper'>
                        <img id='form-icons' src='https://i.imgur.com/kMAaD0x.png' />
                        <p>Enter your name</p>
                        <form>
                            <div>
                                <input ref={r => this.merchantFullName = r} placeholder="Full Name" required />
                            </div>
                            <div className='enter-number'>
                                <img id='form-icons' src='https://i.imgur.com/bbk2dOx.png' />
                                <p>Enter your number</p>
                                <div>
                                    <input ref={r => this.merchantPersonalNumber = r}
                                        placeholder="(111)-222-3333"
                                        required pattern="[0-9]{3}[0-9]{3}[0-9]{4}" 
                                        type='tel'/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='page-circles'>
                        <div className='circles'></div>
                        <div id='unselected' className='circles'></div>
                        <div id='unselected' className='circles'></div>
                    </div>
                    <div className='footer-btn-wrapper'>
                        <button className='large-footer-btn' onClick={this.submitPersonalInfoForm}>Next</button>
                    </div>
                </div>
            </div>
        )
    }


    // STEP 2/3  MERCHANT BUSINESS INFO  ---------------------
    submitBusinessInfoForm = () => {
        this.setState({
            accountSetupForm: 'PRICE_INFO',
            merchantSubmittedInformation: {
                merchantId: this.props.location.state.merchantId,
                merchantFullName: this.state.merchantSubmittedInformation.merchantFullName,
                merchantPersonalNumber: this.state.merchantSubmittedInformation.merchantPersonalNumber,
                businessName: this.businessName.value,
                businessPhoneNum: this.businessPhoneNum.value,
                businessAddress: this.businessAddress.value,
                city: this.city.value,
                province: this.province.value,
                postalCode: this.postalCode.value,
            }
        })
    }

    businessInfoForm = () => {
        return (
            <div className='inital-css'>
                <div className='app-nav'>
                    <h3>Account Setup</h3>
                </div>
                <div className='loginWrapper'>
                    <img id='form-icons' src='https://i.imgur.com/uboTvOx.png' />
                    <p>Enter your buisness details</p>
                    <div><input ref={r => this.businessName = r} placeholder='Business Name' /></div>
                    <div><input ref={r => this.businessPhoneNum = r} placeholder='Business Phone #' type='tel'/></div>
                    <div><input ref={r => this.businessAddress = r} placeholder='Business Address' /></div>
                    <div><input ref={r => this.city = r} placeholder='City' /></div>
                    <div><input ref={r => this.province = r} placeholder='Province / State' /></div>
                    <div><input ref={r => this.postalCode = r} placeholder='Postal / Zip Code' /></div>
                </div>
                <div className='page-circles'>
                    <div id='unselected' className='circles'></div>
                    <div className='circles'></div>
                    <div id='unselected' className='circles'></div>
                </div>
                <div className='footer-btn-wrapper'>
                    <button className='large-footer-btn' onClick={this.submitBusinessInfoForm}>Next</button>
                </div>
            </div>
        )
    }


    // STEP 3/3  MERCHANT SERVICES / PRICE INFO  ---------------------
    priceListForm = () => {
        return (
            <div className='inital-css'>
                <div className='app-nav'>
                    <h3>Account Setup</h3>
                </div>
                <div className='settings-wrapper'>
                    <div>
                        <p>Price List Setup</p>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Trousers </div>
                            <div className='price-wrapper'>
                                $<input className='price-input' ref={r => this.trousersRegular = r} placeholder='4.50' />
                                {/* <input className='price-input' ref={r => this.trousersExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Suit </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.suitRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.suitExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Overcoat </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.overcoatRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.overcoatExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Ladies Suit </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.ladiesSuitRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.ladiesSuitExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Dress </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.dressRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.dressExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Skirt </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.skirtRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.skirtExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Jacket </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.jacketRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.jacketExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Shirt </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.shirtRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.shirtExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Blouse </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.blouseRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.blouseExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='item-wrapper price-listing'>
                            <div className='item-name'>Tie </div>
                            <div className='price-wrapper'>
                            $<input className='price-input' type='number' ref={r => this.tieRegular = r} placeholder='Regular' required />
                                {/* <input className='price-input' type='number' ref={r => this.tieExpress = r} placeholder='Express' /> */}
                            </div>
                        </div>
                    </div>
                </div>
                
                    <div className='footer-btn-wrapper'>
                        <button className='large-footer-btn' onClick={this.createNewAccount}>Create Account</button>
                    </div>
            </div>
        )
    }


    // SUBMITS ALL FORMS & CREATES A NEW MERCHANT ACCOUNT  ---------------------
    createNewAccount = () => {
        var prices = {
            regular: {
                trousers: + this.trousersRegular.value,
                suit: + this.suitRegular.value,
                overcoat: + this.overcoatRegular.value,
                ladiesSuit: + this.ladiesSuitRegular.value,
                dress: + this.dressRegular.value,
                skirt: + this.skirtRegular.value,
                jacket: + this.jacketRegular.value,
                blouse: + this.blouseRegular.value,
                shirt: + this.shirtRegular.value,
                tie: + this.tieRegular.value
            },
            // express: {
            //     trousers: + this.trousersExpress.value,
            //     suit: + this.suitExpress.value,
            //     overcoat: + this.overcoatExpress.value,
            //     ladiesSuit: + this.ladiesSuitExpress.value,
            //     dress: + this.dressExpress.value,
            //     skirt: + this.skirtExpress.value,
            //     jacket: + this.jacketExpress.value,
            //     blouse: + this.blouseExpress.value,
            //     shirt: + this.shirtExpress.value,
            //     tie: + this.tieExpress.value
            // }
        }

        registerMerchant(this.state.merchantSubmittedInformation, prices)



        this.setState({ prices: prices },

            () => this.props.history.push('/dashboard',

                {
                    merchantId: this.props.location.state.merchantId,
                    merchantSubmittedInformation: this.state.merchantSubmittedInformation,
                    prices: this.state.prices
                })
        )
    }

    componentWillMount() {
        console.log(this.state.merchantId)
        if (this.state.merchantId === undefined) { return <Redirect to='/' /> }
        this.setState({ merchantId: this.props.location.state.merchantId }, () => console.log('user ID', this.state.merchantId))
    }

    render() {
        // if (this.state.merchantId === undefined) { return <Redirect to='/signup' /> }
        if (this.state.accountSetupForm === 'PERSONAL_INFO') { return this.personalInfoForm() }
        if (this.state.accountSetupForm === 'BUSINESS_INFO') { return this.businessInfoForm() }
        if (this.state.accountSetupForm === 'PRICE_INFO') { return this.priceListForm() }
    }
}

export default CreateAccount
