angular.module('icons8')

.service('dragDrop',function(){
    let _ts = this;
    this.sizeSelected = '';
    this.myColor = '#000000';
    this.myicons = [];
    
    this.onDrop = function($event,$data,array){
        
        $data.myColor = angular.copy(_ts.myColor);
        $data.sizeSelected = angular.copy(_ts.sizeSelected);

        this.myicons.push($data);
    }
})

.controller('layoutCtr', function($scope, $uibModal, dragDrop){

    $scope.myicons = dragDrop.myicons;

    $scope.onDrop = dragDrop.onDrop;
 
    $scope.openModal = function (size, parentSelector) {
        $uibModal.open({
            backdrop: false,
            templateUrl: 'templates/myModalContent.html',
            controller: 'ModalInstanceCtrl'
        });
    };
})

.controller('ModalInstanceCtrl', function($scope, $http, api, dragDrop, $uibModalInstance){
  
    $scope.icons = [];
    $scope.myis = [];
    
    $scope.currentSizeIconsShow = {'is32': true};
    $scope.sizeSelected =   {'value': 32};
    $scope.sizeSelect = [];
    $scope.myColor = '#000000';
    
    dragDrop.myColor = $scope.myColor;
    dragDrop.sizeSelected = $scope.sizeSelected;
    
    $scope.ok = function () {
      $uibModalInstance.close();
    };
 
    $scope.$watch('sizeSelected', function(valNew, valOld){
         if(valNew == undefined) {
            $scope.currentSizeIconsShow = {'is32': true};
         }else{
             $scope.currentSizeIconsShow = {['is'+valNew.value] : true};
        }
         dragDrop.sizeSelected = valNew;
    })

    $scope.$watch('myColor', function(valNew, valOld){
        dragDrop.myColor = valNew;
    })

    $scope.$watch('msearch', function(valNew, valOld){
       
           $http({
                method: 'GET',
                url: api.url + '/api/iconsets/search?term='+valNew+'&amount=50'
                // data: {term: valNew}
            }).then(function(res){
                 $scope.icons = [];
                let parser = new DOMParser();
                let doc = parser.parseFromString(res.data, "application/xml");
                let el = angular.element(doc.documentElement);
                angular.forEach(el.find('icon'), function(el){
                  
                    let elem = {}

                    angular.forEach(el.childNodes,function(inEl, indx){
                        if(inEl.nodeName == 'png'){
                            elem[inEl.nodeName] = [];

                            // filling the select
                            if(indx== 1  && $scope.sizeSelect.length <= 0){
                                angular.forEach(inEl.childNodes,function(inInEl){
                                    $scope.sizeSelect.push({'value': inInEl.getAttribute('width')})
                                })
                               $scope.sizeSelected =   $scope.sizeSelect[0];
                            }

                            angular.forEach(inEl.childNodes,function(inInEl){
                                elem[inEl.nodeName].push({
                                    'link': inInEl.getAttribute('link'),
                                    'width': inInEl.getAttribute('width'),
                                    'height': inInEl.getAttribute('height')
                                });
                            })
                        }else if(inEl.nodeName == 'svg'){
                            elem[inEl.nodeName] = inEl.textContent;
                        }else{
                            elem[inEl.nodeName] = inEl.outerHTML
                        }
                    })

                    $scope.icons.push(elem)

                })

            },function(res){
              //  $scope.errors = res.data.errors;
            })

    })
})