import React from 'react';
import { render } from '@testing-library/react-native';
import TextField from '@/components/TextField';

describe('TextField Component', () => {
  it('displays feedback message when feedback is provided', () => {
    const feedbackMessage = 'Preencha este campo.';
    const { getByText } = render(
      <TextField
        testID="login-input-username"
        placeholder="Usuário"
        value=""
        onChangeText={() => {}}
        feedback={feedbackMessage}
        editable={true}
      />
    );

    expect(getByText(feedbackMessage)).toBeTruthy();
  });

  it('does not display feedback message when feedback is not provided', () => {
    const { queryByText } = render(
      <TextField
        testID="login-input-username"
        placeholder="Usuário"
        value=""
        onChangeText={() => {}}
        feedback=""
        editable={true}
      />
    );

    expect(queryByText(/Preencha este campo./)).toBeNull();

  });


});
