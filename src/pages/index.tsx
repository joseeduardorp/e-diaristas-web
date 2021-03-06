import useIndex from 'data/hooks/pages/useIndex.page';

import { Button, Typography, Container, CircularProgress } from '@material-ui/core';

import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask';

import {
  FormElementsContainer,
  ProfissionaisPaper,
  ProfissionaisContainer
} from 'ui/styles/pages/index.style';

export default function Home() {
  const {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    erro, 
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes
  } = useIndex();

  return (
    <div>
      <SafeEnvironment />
      <PageTitle
        title={'Conheça os profissionais'}
        subtitle={'Preencha seu endereço e conheça todos os profissionais da sua localidade'}
      />

      <Container>
        <FormElementsContainer>
          <TextFieldMask
            mask={'99.999-999'}
            label={'Digite seu CEP'}
            variant={'outlined'}
            fullWidth
            value={cep}
            onChange={(event) => setCep(event.target.value)}
          />

          {erro && <Typography color={'error'} >{erro}</Typography>}

          <Button
            variant={'contained'}
            color={'secondary'}
            sx={{ width: '220px'}}
            disabled={!cepValido || carregando}
            onClick={() => buscarProfissionais(cep)}
          >
            {carregando ? <CircularProgress size={20} /> : 'Buscar'}
          </Button>
        </FormElementsContainer>

        {
          buscaFeita && (
            diaristas.length > 0 ? (
              <ProfissionaisPaper>
                <ProfissionaisContainer>
                  {diaristas.map((diarista, index) => {
                    return (
                      <UserInformation
                        key={index}
                        name={diarista.nome_completo}
                        picture={diarista.foto_usuario}
                        rating={diarista.reputacao}
                        description={diarista.cidade}
                      />
                    );
                  })}
                </ProfissionaisContainer>
                
                <Container sx={{ textAlign: 'center' }}>
                  {diaristasRestantes > 0 && (
                    <Typography sx={{ mt: 5 }}>
                      ... e mais {diaristasRestantes} {diaristasRestantes > 1 
                      ? 'profissionais atendem'
                      : 'profissional atende'} na sua região.
                    </Typography>
                  )}

                  <Button variant={'contained'} color={'secondary'} sx={{ mt: 5 }}>
                    Contratar um profissional
                  </Button>
                </Container>
              </ProfissionaisPaper>
            ) : (
              <Typography align={'center'} color={'textPrimary'}>
                Ainda não temos nenhuma diarista disponível na sua região.
              </Typography>
            )
          )
        }
      </Container>
    </div>
  )
}
