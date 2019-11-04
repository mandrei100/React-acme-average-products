const { HashRouter, Link, Route, Switch, Redirect } = ReactRouterDOM;
const { Component } = React;
const { render } = ReactDOM;
const root = document.querySelector('#root')

const Companies = () => <h1>Companies</h1>

const Products = (props) => {
    const{products} = props;
    console.log(props);
    return (
        <div>
         <h1>Products</h1>
         <ul>
        {
            products.map( (product, idx) => <li key={ idx }>{ product.name }</li>)
        }

    </ul>
    </div>
    )}


const Nav = () => {
  return (
      <nav>
          <Link to='companies'>Companies</Link>
          <Link to='products'>Products</Link>
      </nav>
  )
}
class App extends Component {
  constructor(){
      super();
      this.state = {
          companies: [],
          products:[],
      };
  }
  async componentDidMount() {
      const companies = (await axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')).data;
      const products = (await axios.get('https://acme-users-api-rev.herokuapp.com/api/products')).data;
      const offerings = (await axios.get('https://acme-users-api-rev.herokuapp.com/api/offerings')).data;

      this.setState ({ companies, products, offerings });
      console.log(this.state.offerings);
  }
    render(){
        const { companies, products, offerings} = this.state;
      return (
      <HashRouter>
          <Route component={ Nav } />
          <Switch>
            <Route path='/companies' component={ Companies } />
              <Route path='/products' render ={() => (<ToBeRendered companies={companies} products={products} offerings={offerings} />)} />
              <Redirect to='/companies' />
          </Switch>
      </HashRouter>
  )
}
}

class ToBeRendered extends Component {
    constructor(props) {
        super(props);
    }
    companiesArray = () => {
        const { companies, offerings, products } = this.props;
        let collection = products.map(element => {
            
            let offers = offerings
            .filter(finder => finder.productId === element.id)
            .map(offer => <li key={offer.id}>{offer.price}</li>);
            return (
            <div>
                <h3>Product Name: {element.name}</h3>
                <p>Suggested Price: {element.suggestedPrice}</p>
                <ul>
            Price(s): {offers}
                </ul>
            </div>);
        });
        return collection
    }
    render() {

        return (
        <div>
        
        {this.companiesArray()}
        </div>
        )
    }
}


render(<App />, root);