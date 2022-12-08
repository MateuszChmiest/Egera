import { useCreditCardValidator, images } from "react-creditcard-validator";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

function App() {
	const {
		getCardNumberProps,
		getExpiryDateProps,
		getCVCProps,
		getCardImageProps,
		meta: { erroredInputs },
	} = useCreditCardValidator();

  const {success, setSuccess} = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (erroredInputs && success) {
      return setSuccess(true)
    }
  }

	return (
		<div className='form'>
			<Form className='form__container' onSubmit={handleSubmit}>
				<Form.Group className='mb-3'>
					<Form.Label className='text-muted'>Email</Form.Label>
					<Form.Control type='email' />
				</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Label className='text-muted'>Card Information</Form.Label>
					<Form.Control
						type='number'
						placeholder='1234 1234 1234 1234'
						{...getCardNumberProps()}
					/>
					<svg {...getCardImageProps({ images })} />
					<small className="error">{erroredInputs.cardNumber && erroredInputs.cardNumber}</small>
					<InputGroup className='mb-3'>
						<Form.Control
							type='number'
							placeholder='MM/YY'
							{...getExpiryDateProps()}
						/>
						<Form.Control type='number' placeholder='CVC' {...getCVCProps()} />
					</InputGroup>

					<Form.Group className='mb-3'>
						<Form.Label className='text-muted'>Name on card</Form.Label>
						<Form.Control type='text' />
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label className='text-muted'>Country or region</Form.Label>
						<Form.Select aria-label='Default select example'>
							<option value='1'>United States</option>
							<option value='2'>United States</option>
							<option value='3'>United States</option>
						</Form.Select>
						<Form.Control type='number' placeholder="ZIP" />
					</Form.Group>
				</Form.Group>
				<Button variant='secondary' type='submit' className='mb-3'>
					Pay
				</Button>
				<p className='text-muted text-center'>Free returns and exchanges</p>
			</Form>
      {success ? 'SUCCESS' : null}
		</div>
	);
}

export default App;
