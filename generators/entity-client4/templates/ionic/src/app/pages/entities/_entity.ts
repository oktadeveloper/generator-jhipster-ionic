<%#
 Copyright 2013-2018 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
<%_ if (fieldsContainBlob) { _%>
import { JhiDataUtils } from 'ng-jhipster';
<%_ } _%>
import { <%= entityAngularName %> } from './<%= entityFileName %>.model';
import { <%= entityAngularName %>Service } from './<%= entityFileName %>.service';

@Component({
    selector: 'page-<%= entityFileName %>',
    templateUrl: '<%= entityFileName %>.html'
})
export class <%= entityAngularName %>Page implements OnInit {
    <%= entityInstancePlural %>: <%= entityAngularName %>[];

    // todo: add pagination

    constructor(
<% if (fieldsContainBlob) { %>
        private dataUtils: JhiDataUtils,
<%_ } _%>
        private navController: NavController,
        private <%= entityInstance %>Service: <%= entityAngularName %>Service,
        private toastCtrl: ToastController,
        public plt: Platform
    ) {
        this.<%= entityInstancePlural %> = [];
    }

    ngOnInit() {
        this.loadAll();
    }

    async loadAll(refresher?) {
        this.<%= entityInstance %>Service.query().pipe(
            filter((res: HttpResponse<<%= entityAngularName %>[]>) => res.ok),
            map((res: HttpResponse<<%= entityAngularName %>[]>) => res.body)
        )
        .subscribe(
            (response: <%= entityAngularName %>[]) => {
                this.<%= entityInstancePlural %> = response;
                if (typeof(refresher) !== 'undefined') {
                    setTimeout(() => {
                        refresher.target.complete();
                    }, 750);
                }
            },
            async (error) => {
                console.error(error);
                const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: <%= entityAngularName %>) {
        return item.id;
    }
<%_ if (fieldsContainBlob) { _%>

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
<%_ } _%>

    open(slidingItem: any, item: <%= entityAngularName %>) {
        this.navController.navigateForward('/tabs/entities/<%= entityFileName %>/new');
    }

    async delete(<%= entityInstance %>) {
        this.<%= entityInstance %>Service.delete(<%= entityInstance %>.id).subscribe(async () => {
            const toast = await this.toastCtrl.create(
                {message: '<%= entityAngularName %> deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(<%= entityInstance %>: <%= entityAngularName %>) {
        this.navController.navigateForward('/tabs/entities/<%= entityFileName %>/' + <%= entityInstance %>.id + '/view');
    }
}