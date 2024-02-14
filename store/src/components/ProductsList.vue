<template>
  <v-container>
    <v-data-iterator :items="products" :items-per-page="products.length">
      <template v-slot:header="{ }">
        <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
          <div class="text-truncate">
            {{ title }}
          </div>
        </h1>
      </template>

      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" xl="3">
            <v-sheet border>
              <v-img :gradient="`to top right, rgba(255, 255, 255, .1), rgba(255, 255, 255, .15)`" :src="item.raw.img"
                cover height="150"></v-img>

              <v-list-item :title="item.raw.productName" lines="two" density="comfortable"
                :subtitle="item.raw.productDescription">
                <template v-slot:title>
                  <strong class="text-h6">
                    {{ item.raw.productName }}
                  </strong>
                </template>
              </v-list-item>

              <v-table density="compact" class="text-caption">
                <tbody>
                  <tr align="right">
                    <th>Code</th>
                    <td>{{ item.raw.productCode }}</td>
                  </tr>

                  <tr align="right">
                    <th>Vendor:</th>
                    <td>{{ item.raw.productVendor }}</td>
                  </tr>

                  <tr align="right">
                    <th>Scale:</th>
                    <td>{{ item.raw.productScale }}</td>
                  </tr>

                  <tr align="right">
                    <th>Category:</th>
                    <td>
                      <router-link :to="{ name: 'category', params: { category: item.raw.productLine } }">
                        <v-chip @click="() => { }">
                          {{ item.raw.productLine }}
                        </v-chip>
                      </router-link>
                    </td>
                  </tr>

                  <tr align="right">
                    <th>Stock:</th>
                    <td>{{ item.raw.quantityInStock }}</td>
                  </tr>

                  <tr align="right">
                    <th>Price:</th>
                    <td>
                      ${{ item.raw.MSRP }}
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  props: ["title", "products"]
}
</script>
