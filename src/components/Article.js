import React from 'react'
import Task from './Task';

class Article extends React.Component {

  render() {
    return (
      <div>
        <section className="section">
          <div className = "container is-narrow">
            <div className="is-box-outer">
              <div className="columns is-centered">
                <div className="column is-two-thirds">
                  <div className="content">
                      <h2 className="task-title is-size-1 has-text-black has-text-weight-bold has-font-serif has-text-centered">Article Title</h2>
                      <p className="tast-details has-text-black has-text-weight-light has-font-serif is-size-7">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae mi placerat, convallis sem eget,
                      cursus purus. Sed molestie, ligula nec eleifend venenatis, quam leo finibus massa, sit amet 
                      condimentum neque nisi at metus. Morbi id dignissim nulla. Duis ut magna auctor, feugiat elit eu, 
                      suscipit orci. Suspendisse sed cursus tellus, at laoreet risus. Maecenas commodo velit sed sem 
                      suscipit, sed elementum nisi vulputate. Maecenas cursus congue nibh, id facilisis augue porta ornare.
                        Aliquam sit amet tortor quis lorem luctus posuere hendrerit eget dui. Nam laoreet urna eget neque 
                        facilisis pulvinar. <br/>

                      Pellentesque porttitor, nibh scelerisque vulputate scelerisque, lorem orci vulputate erat, 
                      sodales vehicula velit <br/>
                      quam pretium eros. Morbi justo ipsum, convallis et urna sit amet, laoreet sagittis turpis. 
                      Nam ante orci, lobortis non mattis sed, suscipit eu lacus. Phasellus ut est commodo, sodales 
                      elit vel, consequat mi. Sed quis nisi convallis, consectetur leo sed, auctor mauris. Donec euismod, 
                      sapien ullamcorper tincidunt pulvinar, elit urna tincidunt tellus, ac consectetur turpis massa quis 
                      metus. Etiam dictum libero vel purus euismod, in laoreet augue ultricies. Ut ultrices dui quis erat 
                      congue aliquet at at lorem. Ut ac purus dolor. Praesent vitae diam sed felis consequat pulvinar at in 
                      tortor. Quisque faucibus blandit felis tristique cursus. <br/>

                      Pellentesque varius consectetur tortor id tristique. Pellentesque at pellentesque ex. 
                      Phasellus rhoncus convallis massa, ut rhoncus mauris viverra et. Fusce viverra tincidunt auctor. 
                      Aliquam tortor nibh, tristique ut commodo vel, pellentesque quis tortor. Etiam vulputate malesuada 
                      orci id interdum. Mauris nulla justo, malesuada vitae volutpat quis, dictum nec eros. Morbi et arcu 
                      lacinia, tincidunt ex vel, mollis nulla. Sed posuere rutrum mollis. Pellentesque egestas eros a varius 
                      tristique. Curabitur hendrerit tortor vel ullamcorper aliquet. Etiam libero enim, bibendum cursus mauris
                      quis, vestibulum fringilla magna. Donec vel facilisis libero, quis molestie enim. Praesent metus mi, 
                      fringilla non consequat pulvinar, laoreet et eros. <br/>

                      Phasellus placerat sem ac lacus tristique, non mollis erat rutrum. 
                      Etiam eget quam non sem ultricies condimentum eu vitae ipsum. Fusce efficitur 
                      lorem eget ante luctus tincidunt. Ut quis dolor eros. Nullam ultrices sapien nisl, 
                      at egestas arcu rhoncus feugiat. Nulla sagittis ipsum non elementum commodo. Class aptent 
                      taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam venenatis 
                      mi quis nisl pharetra, eu fermentum augue vulputate. Praesent tincidunt eros arcu, id malesuada 
                      urna elementum id. Vivamus at purus dolor. Curabitur massa urna, suscipit a erat vitae, posuere 
                      gravida odio. Nullam efficitur consequat odio, consequat facilisis nisi fringilla vitae. Vivamus 
                      sed accumsan lectus. Cras tristique felis tempor, fermentum sem vitae, vulputate tellus. <br/>

                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et dolor a velit congue dictum. 
                      Vestibulum a lectus sit amet velit viverra vulputate. Vestibulum facilisis turpis lacus, sit amet 
                      vestibulum diam cursus ut. Nunc sed volutpat nulla, eget efficitur nisi. Quisque elementum, ante sit 
                      amet ornare imperdiet, mi felis tincidunt est, at commodo risus arcu at nibh. Aliquam aliquet purus 
                      lacus, a dignissim justo pellentesque non. Nunc a mollis ante. In vel dictum erat, at scelerisque 
                      sapien. Nullam vestibulum sed tortor sit amet condimentum. Donec placerat risus a turpis tempor, non 
                      ullamcorper dui congue. Aliquam ut metus et velit semper posuere at sed augue. 
                      </p>        
                  </div>

                  
                  <div className="columns is-centered">
                      <div className="column has-text-centered">
                        <div class="buttons is-centered">
                          <span class="button is-not-satisfiable is-rounded ">Unsatisfactory</span>
                          <span class="button  is-satisfiable is-rounded">satisfactory</span>
                          <span class="button is-excellent is-rounded">Excellent</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="is-box-outer">
              <Task />  
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Article;
