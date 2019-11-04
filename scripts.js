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
      this.setState ({ companies, products });
      console.log(this.state.products);
  }
    render(){
        const { companies, products} = this.state;
      return (
      <HashRouter>
          <Route component={ Nav } />
          <Switch>
            <Route path='/companies' component={ Companies } />
              <Route path='/products' render ={() => (<Products products={products}/>)} />
              <Redirect to='/companies' />
          </Switch>
      </HashRouter>
  )
}
}
render(<App />, root);