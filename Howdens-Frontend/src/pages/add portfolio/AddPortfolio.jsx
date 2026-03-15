import { NewPortfolio } from '../../page components/new portfolio/NewPortfolio';
import NewPortfolioWrapper from '../../page components/new portfolio/NewPortfolioWrapper';

export default function AddPortfolio(){
    return(
        <NewPortfolioWrapper>
            <NewPortfolio/>
        </NewPortfolioWrapper>
    );
}