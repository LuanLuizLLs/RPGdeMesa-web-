import { render } from '@testing-library/react'
import { Input, InputProps } from 'components'

const makeProps = (props?: InputProps): InputProps => {
	return {
		name: 'input',
		stateValue: [{}, jest.fn()],
		...props,
	}
}

describe('Input', () => {
	describe('[type=text]', () => {
		test('deve permanecer com o tipo padrão ao clicar no ícone', () => {
			const { getByTestId } = render(<Input end='TESTE' {...makeProps()} />)

			const end = getByTestId('end')
			const input = getByTestId('input')

			expect(input).toHaveAttribute('type', 'text')

			end.click()

			expect(input).toHaveAttribute('type', 'text')
		})
	})

	describe('[type=password]', () => {
		test('deve exibir o ícone de visualizar senha', () => {
			const { getByTestId } = render(<Input type="password" {...makeProps()} />)

			const end = getByTestId('end')

			expect(end).toHaveAttribute('data-visible', 'true')
		})

		test('deve alterar o tipo do campo ao clicar no ícone', () => {
			const { getByTestId } = render(<Input type="password" {...makeProps()} />)

			const end = getByTestId('end')
			const input = getByTestId('input')

			expect(input).toHaveAttribute('type', 'password')

			end.click()

			expect(input).toHaveAttribute('type', 'text')
		})

		test('deve exibir apenas o ícone de senha', () => {
			const { getByTestId } = render(<Input type="password" end="TESTE" {...makeProps()} />)

			const end = getByTestId('end')

			expect(end).not.toHaveTextContent('TESTE')
		})
	})
})